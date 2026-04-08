using CineTrack.api.Dtos;
using CineTrack.api.Models;
using CineTrack.api.ServiceContracts;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace CineTrack.api.Services;

public class MovieService : IMovieService
{
    private readonly IHttpClientFactory _clientFactory;
    private readonly IConfiguration configuration;
    private readonly string _apiKey;
    private readonly string _baseUrl;
    private readonly IMemoryCache _cache;

    public MovieService(IHttpClientFactory clientFactory, IConfiguration configuration
        , IMemoryCache cache)
    {
        this._clientFactory = clientFactory;
        this.configuration = configuration;
        this._apiKey = configuration["TMDB:ApiKey"] ?? throw new ArgumentNullException("IMDB API Key");
        this._baseUrl = configuration["TMDB:BaseUrl"] ?? throw new ArgumentNullException("IMDB Base URL");
        this._cache = cache;
    }
    public async Task<MovieApiResponse> GetTrendingMoviesAsync()
    {
        if (!_cache.TryGetValue("TrendingMovies", out MovieApiResponse movieApiResponse))
        {
            var movies = await GetTrendingMoviesFromApiAsync();
            _cache.Set("TrendingMovies", movies);
        }

        return _cache.Get<MovieApiResponse>("TrendingMovies");
    }

    private async Task<MovieApiResponse> GetTrendingMoviesFromApiAsync()
    {
        using (var httpClient = _clientFactory.CreateClient("MovieApi"))
        {
            //     --url 'https://api.themoviedb.org/3/trending/movie/day?language=en-US' \
            var httpRequestMessage = new HttpRequestMessage
            {
                RequestUri = new Uri(_baseUrl + "trending/movie/week"),
                Method = HttpMethod.Get,
                //add headers
                Headers = {
                    { "Authorization", $"Bearer {_apiKey}" },
                    { "accept", "application/json" }
                }
            };

            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();
            var stream = new StreamReader(httpResponseMessage.Content.ReadAsStream());
            var content = await stream.ReadToEndAsync();
            var result = JsonSerializer.Deserialize<MovieApiResponse>(content);
            return result;
        }
    }

    public async Task<MovieApiResponse> SearchMoviesAsync(string query, int page = 1)
    {
        using (var httpClient = _clientFactory.CreateClient("MovieApi"))
        {
            /*curl --request GET \
            --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher' \
            --header 'Authorization: Bearer <<access_token>>'
            */
            var httpRequestMessage = new HttpRequestMessage
            {
                RequestUri = new Uri(_baseUrl + "search/movie?query=" + query + "&page=" + page),
                Method = HttpMethod.Get,
                Headers =
                {
                    { "Authorization", $"Bearer {_apiKey}" }
                }
            };

            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
            var stream = new StreamReader(httpResponseMessage.Content.ReadAsStream());
            var content = await stream.ReadToEndAsync();
            var result = JsonSerializer.Deserialize<MovieApiResponse>(content);
            return result;
        }
    }

}
