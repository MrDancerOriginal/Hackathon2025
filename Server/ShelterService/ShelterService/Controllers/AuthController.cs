using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ShelterService.Data;
using ShelterService.Models;
using ShelterService.Models.DTOs;
using ShelterService.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShelterService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        public AuthController(UserManager<IdentityUser> userManager, IConfiguration configuration, AppDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
        {
            //Validation the incoming request

            if (ModelState.IsValid)
            {
                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);

                if (user_exist != null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Errors = new List<string>()
                        {
                            "Email already exist"
                        }
                    });
                }

                //create a user
                var newUser = new IdentityUser()
                {
                    Email = requestDto.Email,
                    UserName = requestDto.Email,
                    PhoneNumber = requestDto.Phone
                };

                var is_created = await _userManager.CreateAsync(newUser, requestDto.Password);

                if (is_created.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newUser, requestDto.Role);

                    if (requestDto.Role == "Volunteer")
                    {

                        if (string.IsNullOrWhiteSpace(requestDto.FullName))
                        {
                            return BadRequest(new AuthResult
                            {
                                Result = false,
                                Errors = new List<string> { "FullName is required for Volunteer role" }
                            });
                        }

                        var volunteer = new Volunteer
                        {
                            UserId = newUser.Id,
                            Name = requestDto.FullName,
                            Phone = requestDto.Phone,
                            Location = requestDto.Location
                        };
                        _context.Volunteers.Add(volunteer);
                    }
                    else if (requestDto.Role == "Shelter")
                    {

                        if (string.IsNullOrWhiteSpace(requestDto.ShelterName))
                        {
                            return BadRequest(new AuthResult
                            {
                                Result = false,
                                Errors = new List<string> { "ShelterName is required for Shelter role" }
                            });
                        }

                        var shelter = new Shelter
                        {
                            UserId = newUser.Id,
                            Name = requestDto.ShelterName,
                            Address = requestDto.Address,
                            Phone = requestDto.Phone,
                            Category = requestDto.Category ?? ShelterCategory.DogCatShelter
                        };
                        _context.Shelters.Add(shelter);
                    }

                    await _context.SaveChangesAsync();

                    var token = await GenerateJwtToken(newUser);

                    return Ok(new AuthResult()
                    {
                        Result = true,
                        Token = token,
                        Id = newUser.Id
                    });
                }

                return BadRequest(new AuthResult()
                {
                    Errors = is_created.Errors.Select(e => e.Description).ToList(),
                    Result = false
                });
            }

            return BadRequest();
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDto loginRequest)
        {
            if (ModelState.IsValid)
            {
                // Check if user is exist
                var existing_user = await _userManager.FindByEmailAsync(loginRequest.Email);

                if (existing_user == null)
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid payload"
                        },
                        Result = false
                    });


                var isCorrect = await _userManager.CheckPasswordAsync(existing_user, loginRequest.Password);

                if (!isCorrect)
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid credentials"
                        },
                        Result = false
                    });

                var token = await GenerateJwtToken(existing_user);

                return Ok(new AuthResult()
                {
                    Token = token,
                    Result = true,
                    Id = existing_user.Id
                });
            }

            return BadRequest(new AuthResult()
            {
                Errors = new List<string>()
                        {
                            "Invalid credentials"
                        },
                Result = false
            });
        }

        private async Task<string> GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim("Id", user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}
