import React, { useEffect, useState } from 'react';
const Character = ({ name, summary, images, jutsus, personalInfo }) => {

    return (
        <div className="character">
            {!images ? (<h3>Loading</h3>) : (
                <div id="details">
                    <h3 id="name">{name}</h3>
                    <div id="left">
                        <img src={images ? images[0] : ""} />
                        {personalInfo.age.length != 0 ? (
                            <div className="ages">
                                <h4>Age</h4>
                                {personalInfo["age"].map(age => (
                                    <p>{age}</p>
                                ))}
                            </div>
                        ) : ""}
                        {jutsus != [] ? (
                            <div id="jutsus">
                                <h4>Jutsu</h4>
                                {jutsus.map(jutsu => (
                                    <p className="jutsu">{jutsu}</p>
                                ))}
                            </div>
                        ) : ""}
                    </div>
                    <div id="right">
                        {summary != "" ? (<p id="summary">{summary}</p>) : ""}
                        {personalInfo.birthdate != "" ? (<p id="birthday">Birthday: {personalInfo.birthdate}</p>) : ""}
                        {personalInfo.height != [] ? (
                            <div id="heights">
                                <h4>Height</h4>
                                {personalInfo.height.map(h => (
                                    <p className="height">{h}</p>
                                ))}
                            </div>
                        ) : ""}
                        {personalInfo.weight != [] ? (
                            <div id="weights">
                                <h4>Weight</h4>
                                {personalInfo.weight.map(w => (
                                    <p className="weight">{w}</p>
                                ))}
                            </div>
                        ) : ""}
                        {personalInfo.affiliation != [] ? (
                            <div id="affiliations">
                                <h4>Affiliations</h4>
                                {personalInfo.affiliation.map(affil => (
                                    <p className="affiliation">{affil}</p>
                                ))}
                            </div>
                        ) : ""}

                        {personalInfo["ninja rank"] != [] ? (
                            <div id="ranks">
                                <h4>Rank</h4>
                                {personalInfo["ninja rank"].map(rank => (
                                    <p className="rank">{rank}</p>
                                ))}
                            </div>
                        ) : ""}
                    </div>

                </div>
               
            )}
        </div>
    )
}

export default Character;