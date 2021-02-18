import React from 'react';
import styled from 'styled-components';
import firebase from './Firebase.js'; // <--- add this line
import CustomizedTimeline from './components/Timeline';
import { Box, Container } from 'react-layout-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
    console.log("in constructor");
  }

  componentDidMount() {
    this.initPage();
  }

  async initPage() {
    console.log("in init page");
    // Fetching data from firestore
    // firebase.firestore().collection("images")
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data); // array of cities objects
    //   });

    // Fetching data from realtime database
    const storage = firebase.storage();

    const itemsRef = firebase.database().ref('images');
    itemsRef.limitToLast(2).on('value', (snapshot) => {
      let items = snapshot.val();
      console.log(items);

      let newState = [];
      for (let item in items) {
        storage.ref(items[item].file).getDownloadURL()
          .then((url) => {
            console.log(url);
            newState.push({
              file: url,
              comment: items[item].comments,
              date: items[item].date
            });
            this.setState({
              items: newState
            });
          })
      }
      console.log(newState);

    });
  }

  render() {
    const {
      items
    } = this.state;
    console.log("in home render");
    console.log(items);

    return (
      <div>
        <Container>
          <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <h2 style={{fontFamily: 'HairyBeard'}}>Enjoy a timeline for your furry friend!</h2>
          </div>
        </Container>
        <CustomizedTimeline items={items}/>
      </div>
    );
  }
}
