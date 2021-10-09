export async function getData(url) {
  let data = await fetch(url);
  data = await data.json();
  return data;
}
