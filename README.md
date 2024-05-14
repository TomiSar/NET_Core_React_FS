# Complete guide to building an app with .Net Core and React

## Install Entity Framework Core .NET Command-line Tools
- dotnet tool install --global dotnet-ef --version 8.0.4
- dotnet tool update --global dotnet-ef --version 8.0.4
- https://www.nuget.org/packages/dotnet-ef

## Run back-end project (folder API)
- dotnet run
- dotnet watch
- dotnet watch --no-hot-reload
- dotnet new gitignore

## Nuget Packages 
- Microsoft.EntityFrameworkCore.Sqlite (Persistence)
- Microsoft.EntityFrameworkCore.Design (API)

## Database migration (create Database) in API
- dotnet ef migrations add InitialCreate -s API -p Persistence
- dotnet ef migrations add IdentityAdded -p Persistence -s API
- dotnet ef migrations add ActivityAttendee -p Persistence -s API
- dotnet ef migrations remove -p Persistence -s API
- dotnet ef migrations add AddCancelledProperty -p Persistence -s API

## Database migration (drop Database) in Reactivities
- dotnet ef database drop -s API -p Persistence

## Create new ClassLibrary, add in project
- dotnet new classlib -n Infrastructure
- dotnet sln add Infrastructure

## Add references (Infrastructure folder)
- dotnet add reference ../Application (Infrastructure folder)
- dotnet add reference ../Infrastructure (API folder)

## API endpoints (Activities)
- http://localhost:5000/api/activities/:activityId 	(GET Activity byId)
- http://localhost:5000/api/activities/     		(GET Activities)
- http://localhost:5000/api/activities/  			(POST create new Activity)
- http://localhost:5000/api/activities/:activityId 	(PATCH update Activity byId)
- http://localhost:5000/api/activities/:activityId 	(Delete Activity byId)