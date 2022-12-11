import * as _ from 'lodash';
import './style.css';
import { createApi } from 'unsplash-js';

const search = document.querySelector<HTMLElement>('.input-form__querry');
const go = document.querySelector<HTMLElement>('.input-form__btn');
const resultContainer = document.querySelector<HTMLElement>('.container');

const api = createApi({
  accessKey: process.env.API_KEY
});

type Photo = {
  url: string,
  alt_description: string,
  author: string
}

interface State {
  searchEntry: string | null;
  recentSearches: string[];
  pictures: Photo[]
}

const state: State = {
  searchEntry: '',
  recentSearches: [],
  pictures: [],
};

const renderImage = (child: string, parent: HTMLElement) => {
  parent.innerHTML += child;
};

const imageTemplate = (url: string, alt_description: string, author: string) => `
    <article class="image-container">
      <figure class="image-wrapper">
        <div class="img-item__front">
          <img class="img-item" src="${url}" alt="${alt_description}" />
        </div>
        <div class="img-item__back">
          <h4>Author: </h4>
          <h4>${author}</h4>
        </div>
      </figure>
    </article>
  `;

const displayPics = (pics: Photo[]) => {
  resultContainer.innerHTML = '';
  pics.forEach(imageSrc => {
    renderImage(imageTemplate(imageSrc.url, imageSrc.alt_description, imageSrc.author), resultContainer);
  });
};

const conductGallerySearch = () => {
  api.search
    .getPhotos({
      query: state.searchEntry,
      page: 1, // TODO add pagination
      perPage: 10,
      orientation: 'landscape',
    })
    .then(result => {
      state.pictures = [];
      state.pictures =  result.response.results.map(element => {
        return {
          url: element.urls.regular,
          alt_description: element.alt_description,
          author: element.user.name,
        }
      });
      displayPics(state.pictures);
    })
    .catch(() => {
      console.log('something went wrong!'); // TODO make use of catch handler
    });
};

go.addEventListener('click', event => {
  event.preventDefault();

  state.searchEntry =  (search as HTMLInputElement).value;
  (search as HTMLInputElement).value = '';
  conductGallerySearch();
  resultContainer.innerHTML += '';
});

// window.addEventListener('statechange', () => {
//   displayPics(state.gallery);
// });

window.dispatchEvent(new Event('statechange'));