# Bacterial-Biodiversity
An interactive web dashboard exploring a belly button bacterial biodiversity data set using Plotly.js  along with the creation a Flask app deployed to Heroku


## Heroku Deployment: 
https://jklug-bacterial-biodiversity.herokuapp.com/


### Dataset:

- http://robdunnlab.com/projects/belly-button-biodiversity/

- https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0047712

### To run locally:

- run app.py in terminal

- open local link in google chrome

- select sample from drop down list

- data will automatically update charts/graphs (metadata table, pie chart, gauge chart and bubble chart)

### Endpoints: (select sample: e.g. <sample> = 940)

- "/metadata/<sample>" 

- "/samples/<sample>"



### Dynamic Webpage Output:

![Webpage output](https://user-images.githubusercontent.com/48166327/62420413-a133c000-b646-11e9-96f2-7e6d7bae4675.PNG)