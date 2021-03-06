import {API} from '../../config';
import queryString from 'query-string';

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
      method: 'GET'
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters={}) => {
  const data = {limit, skip, filters};

  return fetch(`${API}/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => { return res.json()})
  .catch(err => console.log(err))
}

export const list = searchParams => {
  const query = queryString.stringify(searchParams);

  return fetch(`${API}/products?${query}`, {
    method: 'GET'
  })
  .then(res => { return res.json()})
  .catch(err => console.log(err))
}