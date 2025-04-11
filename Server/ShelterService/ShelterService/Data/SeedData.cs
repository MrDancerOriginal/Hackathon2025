using Microsoft.AspNetCore.Identity;

namespace ShelterService.Data
{
    public class SeedData
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Shelter"))
            {
                await roleManager.CreateAsync(new IdentityRole("Shelter"));
            }
            if (!await roleManager.RoleExistsAsync("Volunteer"))
            {
                await roleManager.CreateAsync(new IdentityRole("Volunteer"));
            }
        }
    }
}
