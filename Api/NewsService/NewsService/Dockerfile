FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5153

ENV ASPNETCORE_URLS=http://+:5153

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["Api/NewsService/NewsService/Api.csproj", "Api/NewsService/NewsService/"]
COPY ["Api/NewsService/Infrastucture/Infrastucture.csproj", "Api/NewsService/Infrastucture/"]
COPY ["Api/NewsService/Service/Service.csproj", "Api/NewsService/Service/"]
COPY ["Api/NewsService/Domain/Domain.csproj", "Api/NewsService/Domain/"]
COPY ["Libs/Core/Core.csproj", "Libs/Core/"]
RUN dotnet restore "Api/NewsService/NewsService/Api.csproj"
COPY . .
WORKDIR "/src/Api/NewsService/NewsService"
RUN dotnet build "Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]