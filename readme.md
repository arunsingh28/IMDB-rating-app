# Velozity Assignment

## _Server APIS_

1. ```/api/movies/search?title=```**_movie name_**
> **Search api** for searching movies by passing query **title** 
> _example_ /api/movies/search&title=avatar

2. ```/api/movies/favorites```
> **Favorites api** for adding movies to fav list
> _example_ send all below data in body with same key
```{
    Year: string
    Type: string
    Poster: string
    Title: string
    OMDBID: string
}
```
3. ```api/movies/remove?OMDBID=```**_movie omdbID_**
> **Remove From Fav** for removing movies from fav list
> _example_ for removing movies from fav by passing query **omdbID** 

4. ```/api/fav/list``` 
> **List all fav movies** list all the movies which is in file DB


## _Deployment_

**Backend**
Hosted on AWS EC2 [https:velozity.blueorbit.app](https:velozity.blueorbit.app)

**Frontend**
Hosted on Netlify [https:velozity-omdb.netlify.app](https:velozity-omdb.netlify.app)