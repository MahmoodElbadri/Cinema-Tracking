using CineTrack.api.Dtos;

namespace CineTrack.api.ServiceContracts;

public interface IAnalyticsService
{
    Task<UserAnalyticsDto> GetUserAnalyticsAsync(string userId);
}