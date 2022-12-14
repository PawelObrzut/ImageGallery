import * as _ from 'lodash';
import './style.css';
import { createApi } from 'unsplash-js';

const search = document.querySelector<HTMLElement>('.input-form__querry');
const go = document.querySelector<HTMLElement>('.input-form__btn');
const resultContainer = document.querySelector<HTMLElement>('.container');
const searchList = document.querySelector<HTMLElement>('#recent-search-queries');
const pages = document.querySelector<HTMLUListElement>('.pages');

const api = createApi({
  accessKey: process.env.API_KEY
});

type Photo = {
  url: string,
  alt_description: string,
  author: string
};

interface State {
  searchQuery: string;
  recentSearches: string[];
  pictures: Photo[];
  currentPage: number;
  total_pages: number;
};

let state: State = {
  searchQuery: '',
  recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
  pictures: [],
  currentPage: 0,
  total_pages: 0,
};

const update = (newState: State) => {
  state = { ...state, ...newState };
  window.dispatchEvent(new Event('statechange'));
};

const saveRecentSearches = (recentSearches: string[]) => {
  window.localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
};

const addSearchHistory = (recentSearches: string[]) => {
  searchList.innerHTML = '';
  recentSearches.map(query => {
    const optionTag = document.createElement('option');
    optionTag.setAttribute('value', query);
    optionTag.innerText = query;
    searchList.appendChild(optionTag);
  });
}

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

const paginationTemplate = (currentPage: number, numberOfPages:number) =>{

  return `
    <li><button ${currentPage < 2 ? "disabled" : "active" } class="prevPage"> < PREV </button></li>
    <li class="currentPage">${currentPage} / ${numberOfPages}</li>
    <li><button ${currentPage <= numberOfPages - 1 ? "active" : "disabled" } class="nextPage"> NEXT > </button></li>
  `
};

const displayPagination = () => {
  pages.innerHTML = '';
  pages.innerHTML += paginationTemplate(state.currentPage, state.total_pages);
};

const conductGallerySearch = () => {
  api.search
    .getPhotos({
      query: state.searchQuery,
      page: state.currentPage,
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
        searchQuery: state.searchQuery,
        recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
        pictures: resultPics,
        currentPage: state.currentPage,
        total_pages: result.response.total_pages,
      });

      (search as HTMLInputElement).value = '';
    })
    .catch(() => {
      console.log('something went wrong!');
    });
};

go.addEventListener('click', event => {
  event.preventDefault();
  state.recentSearches.unshift((search as HTMLInputElement).value);
  if (state.recentSearches.length > 3) {
    state.recentSearches.pop();
  }
  state.currentPage = 1;
  saveRecentSearches(state.recentSearches);
  state.searchQuery = (search as HTMLInputElement).value;
  conductGallerySearch();
});

pages.addEventListener('click', (event: Event) => {
  if ((event.target as Element).matches('.prevPage')) {
    state.currentPage = state.currentPage - 1;
    conductGallerySearch();
  }
  if ((event.target as Element).matches('.nextPage')) {
    state.currentPage = state.currentPage + 1;
    conductGallerySearch();
  }
})

window.addEventListener('statechange', () => {
  resultContainer.innerHTML += '';
  displayPics(state.pictures);
  addSearchHistory(state.recentSearches);
  displayPagination();
});

window.dispatchEvent(new Event('statechange'));
