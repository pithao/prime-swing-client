import {useState, useEffect} from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
function FireBaseTest(){
    const [ surveys, setSurvey ] = useState([])
    const userCollectionRef = collection( db, "classSurvey" )


    useEffect(() => {
        const getSurveys = async () => {

         const data = await getDocs(userCollectionRef)
         console.log("What are we getting from the DB: ", data)
         setSurvey(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getSurveys()
        console.log("What's in the box: ", surveys)
    }, [] );

    return(
        <div>
            <p>{JSON.stringify(surveys)}</p>
            {surveys.map((survey) => (
                
                <div>
                {" "}
                    <h1> age: {survey.age} </h1>
                </div>
            ))}
        </div>
    )
}

export default FireBaseTest;
