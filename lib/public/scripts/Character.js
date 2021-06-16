import Carousel from './Carousel';
const Character = ({ name, summary, images, jutsus, personalInfo }) => {
    return (
        <div key={name} className="character">
            
            {!images.length ? (<h3 style={{'fontSize': '2em'}}>Loading...</h3>) : (
                <div id="details">
                    <h3 id="name">{name}</h3>
                    <div id="left">
                        {images ? (
                            <Carousel images={images} />
                        ): ""}
                        {personalInfo.age.length != 0 ? (
                            <div className="ages">
                                <h4>Age</h4>
                                {personalInfo["age"].map(age => (
                                    <p key={age}>{age}</p>
                                ))}
                            </div>
                        ) : ""}
                        {jutsus.length != 0 ? (
                            <div id="jutsus">
                                <h4>Jutsu</h4>
                                {jutsus.map(jutsu => (
                                    <p key={jutsu} className="jutsu">{jutsu}</p>
                                ))}
                            </div>
                        ) : ""}
                    </div>
                    <div id="right">
                        {summary != "" ? (<div id="summary">
                            <h4>About</h4><p>{summary}</p></div>) : ""}
                        {personalInfo.birthdate != "" ? (<div id="birthday"><h4>Birthday</h4><p>{personalInfo.birthdate}</p></div>) : ""}
                        {personalInfo.height.length ? (
                            <div id="heights">
                                <h4>Height</h4>
                                {personalInfo.height.map(h => (
                                    <p key={h} className="height">{h}</p>
                                ))}
                            </div>
                        ) : ""}
                        {personalInfo.weight.length ? (
                            <div id="weights">
                                <h4>Weight</h4>
                                {personalInfo.weight.map(w => (
                                    <p key={w} className="weight">{w}</p>
                                ))}
                            </div>
                        ) : ""}
                        {personalInfo.affiliation.length ? (
                            <div id="affiliations">
                                <h4>Affiliations</h4>
                                {personalInfo.affiliation.map(affil => (
                                    <p key={affil} className="affiliation">{affil}</p>
                                ))}
                            </div>
                        ) : ""}

                        {personalInfo["ninja rank"].length ? (
                            <div id="ranks">
                                <h4>Rank</h4>
                                {personalInfo["ninja rank"].map(rank => (
                                    <p key={rank} className="rank">{rank}</p>
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