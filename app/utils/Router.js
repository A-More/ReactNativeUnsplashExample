import {StackNavigator} from 'react-navigation';
import RandomPhotos from "../screens/RandomPhotos";
import CuratedPhotos from "../screens/CuratedPhotos";
import CuratedItem from'../components/CuratedItem';
export const chacha = StackNavigator({
    Nouman:{
        screen:RandomPhotos,
    },
    Srivastav:{
        screen:CuratedPhotos,
    },
    Nishant:{
        screen:CuratedItem,
    },
})