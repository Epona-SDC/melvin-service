const {lorem:{ sentence, paragraph }, image, random} = require('faker');

const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//100 times
const createNewListing = (index) => {

  // Write one record onto a csv file
const fileLocation =  path.join(__dirname, `./data/listing${index}.csv`)

const csvWriter = createCsvWriter({
  path: fileLocation,
  header: [
      {id: 'listingNumber', title: 'listingNumber'},
      {id: 'title', title: 'title'},
      {id: 'description', title: 'description'},
      {id: 'photos', title: 'photos'},
  ],
  fieldDelimiter: ';'
});

const randomNum = () => random.number({min:0, max:6});
const getRandomPhotos = () => {
  let photoUrls = "{"
  for (let i = 0, len = randomNum(); i < len ; i += 1){
    photoUrls+= image.imageUrl();
    if (i !== len -1) {
      photoUrls+= ","
    }
  }
  photoUrls += "}";
  return photoUrls;
}

const generateOneMillion = (index) => {
  const records = [];
  for (let i = 1; i <= 1000000; i++) {
    var listingNumber = index === 1 ? i : ((index - 1) * 1000000) + i;
    // console.log(i);
    records.push({
      listingNumber, title: sentence(), description: paragraph(),
      photos: getRandomPhotos()
    })
  }
  return records;
}
console.time('generateOneMillion-' +index)
console.timeLog('generateOneMillion-' +index)
const lists = generateOneMillion(index);

 return csvWriter.writeRecords(lists)       // returns a promise
    .then(() => {
        console.timeEnd('generateOneMillion-' +index)
      });
}
const getData = async () =>{
  for (let i = 1 ; i <= 10 ; i++) {
    await createNewListing(i);
  }
}
getData()
  .then(() => {
    console.log('10 CSV files populated');
  })
