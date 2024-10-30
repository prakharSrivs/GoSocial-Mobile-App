import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export const Description = ({ authorName, description, inDetailedView })=>{

    const [ showMore, setShowMore ] = useState(inDetailedView);

    if( description.length < 100 ){
        return (
        <View style={styles.description}>
            <Text style={styles.descriptionText}>
                <Text style={styles.descriptionHeader}>{authorName+"  "}</Text>     
                {description.trim()}
            </Text>
        </View>            
        )
    }

    return (
    <View style={styles.description}>
        <Text style={styles.descriptionText}>
            <Text style={styles.descriptionHeader}>{authorName+"  "}</Text>     
            { showMore ? description : description.substring(0,90)}
            <Text 
                style={{color:"#CDCDCD"}} 
                onPress={()=>setShowMore(!showMore)}
            > 
                ...show { showMore ? "less" : "more"} 
            </Text>
        </Text>
    </View>
    )
}