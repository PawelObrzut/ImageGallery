import * as _ from 'lodash';
import './style.css';
import { createApi } from 'unsplash-js';

const search = document.querySelector<HTMLElement>('.input-form__querry');
const go = document.querySelector<HTMLElement>('.input-form__btn');
const resultContainer = document.querySelector<HTMLElement>('.container');
const searchList = document.querySelector<HTMLElement>('#recent-search-queries')

const api = createApi({
  accessKey: process.env.API_KEY
});

type Photo = {
  url: string,
  alt_description: string,
  author: string
}

interface State {
  recentSearches: string[];
  pictures: Photo[]
}

let state: State = {
  recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
  pictures: [],
};

const update = (newState: State) => {
  state = { ...state, ...newState };
  window.dispatchEvent(new Event('statechange'));
};

const saveRecentSearches = (recentSearches: string[]) => {
  window.localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
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

const displayPics = (pictures: Photo[]) => {
  resultContainer.innerHTML = '';
  pictures.forEach(({url, alt_description, author}) => {
    renderImage(imageTemplate(url, alt_description, author), resultContainer);
  });
};

const conductGallerySearch = () => {
  api.search
    .getPhotos({
      query: (search as HTMLInputElement).value,
      page: 1,
      perPage: 10,
      orientation: 'landscape',
    })
    .then(result => {
      const resultPics = result.response.results.map(element => {
        return {
          url: element.urls.regular,
          alt_description: element.alt_description,
          author: element.user.name,
        }
      });

      update({
        recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
        pictures: resultPics,
      });

      (search as HTMLInputElement).value = '';
    })
    .catch(() => {
      console.log('something went wrong!');
    });
};

go.addEventListener('click', event => {
  event.preventDefault();
  conductGallerySearch();
});

window.addEventListener('statechange', () => {
  resultContainer.innerHTML += '';
  displayPics(state.pictures);
});

window.dispatchEvent(new Event('statechange'));
