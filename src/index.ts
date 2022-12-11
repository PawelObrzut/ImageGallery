import * as _ from 'lodash';
import './style.css';
import { createApi } from 'unsplash-js';

const search = document.querySelector<HTMLElement>('.input-form__querry');
const go = document.querySelector<HTMLElement>('.input-form__btn');
const resultContainer = document.querySelector<HTMLElement>('.container');

const api = createApi({
  accessKey: process.env.API_KEY
});

interface State {
  title: string;
  gallery: string[];
  searchEntry: string | null;
  recentSearches: string[];
}

const state: State = {
  title: 'A Photo Gallery',
  gallery: [],
  searchEntry: '',
  recentSearches: [],
};

const renderImage = (child: string, parent: HTMLElement) => {
  parent.innerHTML += child;
};

const imageTemplate = (url: string) => `
    <article class="image-container">
      <figure class="image-wrapper">
        <div class="img-item__front">
          <img class="img-item" src="${url}" />
        </div>
        <div class="img-item__back">
          <h4>Image Details</h4>
        </div>
      </figure>
    </article>
  `;

const displayPics = (pics: string[]) => {
  resultContainer.innerHTML = '';
  pics.forEach(imageSrc => {
    renderImage(imageTemplate(imageSrc), resultContainer);
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
      state.gallery = [];
      state.gallery = result.response.results.map(element => (element.urls.regular));
      displayPics(state.gallery);
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

window.addEventListener('statechange', () => {
  displayPics(state.gallery);
});

window.dispatchEvent(new Event('statechange'));