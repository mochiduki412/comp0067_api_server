async function popTerms(termModel){
    const terms = 
    [{ 
        title: "Build back better",
        text: "The use of the recovery, rehabilitation and reconstruction phases after a disaster to increase the resilience of nations and communities through \
            integrating disaster risk reduction measures into the restoration of physical infrastructure and societal systems, and into the revitalization of \
            livelihoods, economies and the environment.",
    },
    { 
        title: "Reconstruction", 
        text: "The medium- and long-term rebuilding and sustainable restoration of resilient critical infrastructures, services, housing, facilities and livelihoods \
            required for the full functioning of a community or a society affected by a disaster, aligning with the principles of sustainable development and “build back\
            better”, to avoid or reduce future disaster risk.",
    },
    { 
        title: "Capacity", 
        text: "The combination of all the strengths, attributes and resources available within an organization, community or society to manage \
            and reduce disaster risks and strengthen resilience. Capacity may include infrastructure, institutions, human knowledge and skills, and collective attributes \
            such as social relationships, leadership and manage- ment.",
    }];

    terms.forEach( async term => {
        await termModel.create(term);
    });
}

async function popLanguages(LanguageModel){
    let languages = ['Kono', 'Krio', 'English'];
    languages.forEach( async lang => {
        await LanguageModel.create({language: lang});
    });
}

async function populateDB(termModel, LanguageModel){
    // await popLanguages(LanguageModel);
    await popTerms(termModel);
}

module.exports.populateDB = populateDB;
