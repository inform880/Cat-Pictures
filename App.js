import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.ALL);

export default class App extends React.Component {
  state = {
    CurCatPicURL: "",
    URLlist: [],
    spinner: true,
    catSub: [
      "cat",
      "CatLoaf",
      "Floof",
      "Blep",
      "CatsStandingUp",
      "CatBellies",
      "DelightfullyChubby",
      "CatsLookingSeductive",
      "CatConspiracy",
      "CatLogic",
      "OnlyHappyCats",
      "CatsGivingHighFives",
      "StartledCats",
      "CatSelfies",
      "FierceCats",
      "FailCat",
      "SneezingCats",
      "CatsSittingDown",
      "CatPawTouches",
      "ThumbCats",
      "JellybeanToes",
      "GrumpyCats",
      "MyHatIsACat",
      "HoldMyNip",
      "StandingCats",
      "CatHighFive",
      "BobbleHeadCats",
      "CatsAreAssholes",
      "MildlyStartledCats",
      "CatsEatingPasta",
      "ShoulderCats",
      "Hovercat",
      "Teefies",
      "LazyCats",
      "CatFaceplant",
      "InterruptingCats",
      "CatHats",
      "CatRolls",
      "DrillCats",
      "CatsNamedToothless",
      "CatWiggle",
      "CatsAreJerks",
      "BathroomKitties",
      "Cathletes",
      "CatsAreDicks",
      "CatsBeingDicks",
      "HoldMyMilk",
      "BlepLoaf",
      "BadAtCat",
      "Unorthocat",
      "CatKicks",
      "TheCatTrapIsWorking",
      "KittyHugs",
      "CatsHiding",
      "BarnCat",
      "SupermodelCats",
      "CatsClimbingPeople",
      "boopablenosies",
      "thecatdimension",
      "curledfeetsies"
    ]
  };

  getCatPicture() {
    fetch(
      `https://www.reddit.com/r/${
        this.state.catSub[Math.floor(Math.random() * this.state.catSub.length)]
      }/.json`
    )
      .then(res => res.json())
      .then(json => {
        const url = json.data.children[0].data.url;
        console.log(url);
        if (
          url.includes(".jpg" || ".gif" || ".png") &&
          !this.state.URLlist.includes(url)
        ) {
          return url;
        }
        return "";
      })
      .then(CurCatPicURL =>
        this.setState(state => ({
          CurCatPicURL: CurCatPicURL,
          URLlist: [...state.URLlist, CurCatPicURL]
        }))
      )
      .catch(error => {
        this.setState({
          error: ``
        });
      });
  }

  LoadList() {
    this.setState({ spinner: true })
    
  }

  componentWillMount() {
    this.LoadList();
  }

  render() {
    const { CurCatPicURL, spinner, URLlist } = this.state;
    if (CurCatPicURL === "") {
      this.getCatPicture();
    }
    console.log(this.state);
    return (
      <TouchableOpacity
        style={styles.container}
        onPressIn={() => this.getCatPicture()}
      >
        <Spinner
          visible={spinner}
          textContent={`Loading ${URLlist.length/100}`}
          textStyle={styles.spinnerTextStyle}
        />
        {CurCatPicURL === "" || (
          <Image
            resizeMode="contain"
            style={styles.canvas}
            source={{ uri: CurCatPicURL }}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "relative"
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
