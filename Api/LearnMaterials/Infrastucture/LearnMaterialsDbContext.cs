using Core.Cards;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture
{
    public class LearnMaterialsDbContext : DbContext
    {
        public LearnMaterialsDbContext(DbContextOptions<LearnMaterialsDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<LearnMaterialCard> LearnMaterialCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Card)
                .WithMany()
                .HasForeignKey(c => c.CardId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}