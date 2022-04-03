const helper = require('./helper.js');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const teeth = e.target.querySelector('#domoTeeth').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !age || !teeth) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, teeth, _csrf}, loadDomosFromServer);

    return false;
};

const SetPremium = (e, value) => {
    e.preventDefault();
    helper.hideError();

    const isPremium = value;
    const _csrf = e.target.querySelector('#_csrf').value;
    
    helper.sendPost(e.target.action, {isPremium, _csrf}, LoadAds);

    return false;
}

const Ads = (props) => {
    if(props.premium === "false") return (
        <div id="ads" className="adBox">
            <img src="/assets/img/ad1.jpg" alt="ad" className="ad" />
            <img src="/assets/img/ad2.jpg" alt="ad" className="ad" />
        </div>
    );
    return (<div></div>);
};

const LoadAds = async () => {
    const response = await fetch('/getPremium');
    const premiumData = await response.json();
    ReactDOM.render(
        <Ads premium={premiumData.premium ? premiumData.premium : "false"} />,
        document.getElementById('ads')
    );
};

const PremiumButton = (props) => {
    if(props.premium === "true") return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => SetPremium(e, "false")}
            action="/premium"
            method="POST"
            className="premiumForm"
        >
            <h3>You have premium!</h3>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="premiumButton" type="submit" value="Remove Premium" />
        </form>
    );
    return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => SetPremium(e, "true")}
            action="/premium"
            method="POST"
            className="premiumForm"
        >
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="premiumButton" type="submit" value="Buy Premium" />
        </form>
        //<div className="premiumBox">
        //    <label htmlFor="premium">Premium: </label>
        //    <input id="premiumCheck" type="checkbox" name="premium" />
        //</div>
    );
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            name="domoForm"
            onSubmit={handleDomo}
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" name="age" min="0" />
            <label htmlFor="teeth">Teeth: </label>
            <input id="domoTeeth" type="number" name="teeth" min="0" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                <h3 className="domoTeeth"> Teeth: {domo.teeth} </h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}

const init = async () => {
    // can definitely be condensed
    const response = await fetch('/getToken');
    const data = await response.json();
    const response2 = await fetch('/getPremium');
    const premiumData = await response2.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );
    
    ReactDOM.render(
        <PremiumButton premium={premiumData.premium} csrf={data.csrfToken} />,
        document.getElementById('premium')
    );

    ReactDOM.render(
        <DomoForm domos={[]} />,
        document.getElementById('domos')
    );

    LoadAds();

    loadDomosFromServer();
}

window.onload = init;