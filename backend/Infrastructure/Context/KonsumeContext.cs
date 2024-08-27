using KONSUME.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Org.BouncyCastle.Asn1.Ocsp;
using KONSUME.Models.Entities;
using System.Text.Json;

namespace KONSUME.Infrastructure.Context
{
    public class KonsumeContext : DbContext
    {
        public KonsumeContext(DbContextOptions<KonsumeContext> opt) : base(opt)
        {
            
        }

        public DbSet<Role> Roles => Set<Role>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Profile> Profiles => Set<Profile>();
        public DbSet<UserInteraction> UserInteractions => Set<UserInteraction>();
        public DbSet<VerificationCode> VerificationCodes => Set<VerificationCode>();
        public DbSet<MealRecommendation> MealRecommendations => Set<MealRecommendation>();


        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(new ValueConverter<DateTime, DateTime>(
                            v => v.ToUniversalTime(),
                            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)));
                    }
                }
            }

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>().Property<int>("Id").ValueGeneratedOnAdd();
            modelBuilder.Entity<User>().Property<int>("Id").ValueGeneratedOnAdd();
            modelBuilder.Entity<Profile>().Property<int>("Id").ValueGeneratedOnAdd();
            modelBuilder.Entity<UserInteraction>().Property<int>("Id").ValueGeneratedOnAdd();
            modelBuilder.Entity<VerificationCode>().Property<int>("Id").ValueGeneratedOnAdd();
            modelBuilder.Entity<VerificationCode>()
            .HasOne(vc => vc.User)
            .WithMany(u => u.VerificationCodes)
            .HasForeignKey(vc => vc.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
            .Property(p => p.AllergiesSerialized)
            .HasConversion(
                v => v,
                v => v
            );

            modelBuilder.Entity<Profile>()
            .Property(p => p.GoalsSerialized)
            .HasConversion(
                v => v,
                v => v
            );

            modelBuilder.Entity<Profile>().Ignore(p => p.Allergies);
            modelBuilder.Entity<Profile>().Ignore(p => p.UserGoals);

            modelBuilder.Entity<Role>().HasData(
            new Role { Id = 1, DateCreated = DateTime.UtcNow, Name = "Admin", CreatedBy = "1" },
            new Role { Id = 2, DateCreated = DateTime.UtcNow, Name = "Patient", CreatedBy = "1" }
            );

            modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                DateCreated = DateTime.UtcNow,
                FirstName = "Hasbiy",
                LastName = "Oyebo",
                IsDeleted = false,
                Email = "oyebohm@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("admin"),
                RoleId = 1,
                CreatedBy = "1"
            });

            modelBuilder.Entity<Profile>().HasData(
            new Profile
            {
                Id = 1,
                Weight = 45,
                Gender = Core.Domain.Enum.Gender.Female,
                DateOfBirth =  DateTime.SpecifyKind(new DateTime(2008, 3, 19, 0, 0, 0), DateTimeKind.Utc),
                DateCreated = DateTime.UtcNow,
                Height = 90,
                IsDeleted = false,
                UserId = 1,
                CreatedBy = "1",
                Nationality = "Nigerian",
                AllergiesSerialized = JsonSerializer.Serialize(new List<string>()),
                GoalsSerialized = JsonSerializer.Serialize(new List<string>())
            });
        }
    }
}
