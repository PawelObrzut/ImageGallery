# Image Gallery

A front-end application for searching for images from the Unsplash collection. The project uses a webpack bundle and correct configuration was one of the major parts of this project.

The layout incorporates a grid, pagination, and spinning wheel for a better user experience. Request to Unsplash API is made with the Unsplash npm package. The whole script is written in a Typescript superset.

The last 3 searches are stored in the local storage.

***

Technologies
- Typescript
- Webpack
- CSS grid
- Unsplash.js

***

## Installation

To get started, you will need to clone the repository.

```bash
git clone https://github.com/PawelObrzut/ImageGallery.git
```

Next, You need to get into the directory and install the dependencies

```bash
cd ImageGallery
npm install
```

Since it is a static project no localhost server is needed. However, you need your API key. Add .env file in the root directory

```bash
touch .env
```

 and add inside:
 > API_KEY=yourUnsplashAPIKey. 
 
Run the build script and enjoy using this application.

```
npm run build
```

The project is ready to use by opening **dist/index.html** file in your browser.

***

![CartPageDemo](/imageGallery.png)

***

In the root of this project you will also find Dockerfile and nginx.confi files with instructions to encapsulate it into a container. Comes handly when deploying using popular hosting services.