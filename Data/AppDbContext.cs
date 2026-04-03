using Adoztech.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Adoztech.Web.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();
    public DbSet<QuoteRequestSubmission> QuoteRequestSubmissions => Set<QuoteRequestSubmission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ContactSubmission>(entity =>
        {
            entity.Property(x => x.FullName).HasMaxLength(160);
            entity.Property(x => x.Email).HasMaxLength(256);
            entity.Property(x => x.Phone).HasMaxLength(64);
            entity.Property(x => x.Subject).HasMaxLength(160);
            entity.Property(x => x.Culture).HasMaxLength(8);
            entity.Property(x => x.Status).HasConversion<string>().HasMaxLength(32);
        });

        modelBuilder.Entity<QuoteRequestSubmission>(entity =>
        {
            entity.Property(x => x.FullName).HasMaxLength(160);
            entity.Property(x => x.CompanyName).HasMaxLength(160);
            entity.Property(x => x.Email).HasMaxLength(256);
            entity.Property(x => x.Phone).HasMaxLength(64);
            entity.Property(x => x.ServiceType).HasMaxLength(64);
            entity.Property(x => x.BudgetRange).HasMaxLength(64);
            entity.Property(x => x.Timeline).HasMaxLength(64);
            entity.Property(x => x.Culture).HasMaxLength(8);
            entity.Property(x => x.Status).HasConversion<string>().HasMaxLength(32);
        });
    }
}
