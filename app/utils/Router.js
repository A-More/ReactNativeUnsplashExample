import {StackNavigator} from 'react-navigation';
import RandomPhotos from "../screens/RandomPhotos";
import CuratedPhotos from "../screens/CuratedPhotos";
import Home from "../screens/Home"
import CuratedItem from'../components/CuratedItem';
import ImageScreen from '../screens/ImageScreen'

export const Router = StackNavigator({
    Home:{
        screen: Home,
    },
    Random:{
        screen:RandomPhotos,
    },
    Curated:{
        screen:CuratedPhotos,
    },
    CuratedItem:{
        screen:CuratedItem,
    },
    ImageScreen:{
        screen:ImageScreen,
    }
})