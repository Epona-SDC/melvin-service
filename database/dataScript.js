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
  ]
});

const randomNum = () => random.number({min:0, max:6});
const getRandomPhotos = () => {
  const photoUrls = []
  for (let i = 0, len = randomNum(); i < len ; i += 1){
    photoUrls.push(`"${image.imageUrl()}"`);
  }
  return photoUrls;
}

const generateHundredThousand = (index) => {
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
console.time('generateHundredThousand-' +index)
console.timeLog('generateHundredThousand-' +index)
const lists = generateHundredThousand(index);

 return csvWriter.writeRecords(lists)       // returns a promise
    .then(() => {
        console.timeEnd('generateHundredThousand-' +index)
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
