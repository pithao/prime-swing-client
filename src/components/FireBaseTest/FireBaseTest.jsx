import {useState, useEffect} from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
function FireBaseTest(){
    const [ surveys, setSurvey ] = useState([])
    const userCollectionRef = collection( db, "classSurvey" )


    useEffect(() => {
        const getSurveys = async () => {

         const data = await getDocs(userCollectionRef)
         
         setSurvey(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getSurveys()
        
    }, [] );

    return(
        <div>
            <p>{JSON.stringify(surveys)}</p>
            {surveys.map((survey) => (
                
                <div key={survey.id}>
                {" "}
                    <h3>Name: {survey.name}</h3>
                    <p> age: {survey.age} </p>
                    
                </div>
            ))}
        </div>
    )
}

export default FireBaseTest;
