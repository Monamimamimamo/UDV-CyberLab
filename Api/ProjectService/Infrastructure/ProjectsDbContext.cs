using Core.Cards;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ProjectsDbContext : DbContext
    {
        public ProjectsDbContext(DbContextOptions<ProjectsDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<ProjectCard> Cards { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Card)
                .WithMany()
                .HasForeignKey(c => c.CardId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.Card)
                .WithMany()
                .HasForeignKey(r => r.CardId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Make ProjectId and UserId a unique constraint for ratings
            modelBuilder.Entity<Rating>()
                .HasIndex(r => new { r.CardId, r.UserId })
                .IsUnique();
        }
    }
}