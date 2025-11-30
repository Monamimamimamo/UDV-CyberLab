FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5158

ENV ASPNETCORE_URLS=http://+:5158

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["Api/LearnMaterials/Api/Api.csproj", "Api/LearnMaterials/Api/"]
COPY ["Api/LearnMaterials/Infrastucture/Infrastucture.csproj", "Api/LearnMaterials/Infrastucture/"]
COPY ["Api/LearnMaterials/Service/Service.csproj", "Api/LearnMaterials/Service/"]
COPY ["Api/LearnMaterials/Domain/Domain.csproj", "Api/LearnMaterials/Domain/"]
COPY ["Libs/Core/Core.csproj", "Libs/Core/"]
RUN dotnet restore "Api/LearnMaterials/Api/Api.csproj"
COPY . .
WORKDIR "/src/Api/LearnMaterials/Api"
RUN dotnet build "Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]

