const baseUrl =
  "https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/";
export const useFetch = (url) => {
  if (url == "stock/fetch-all?refresh=true")
    return [
      {
        name: "C. Pujara",
        currentSupply: 1000,
        country: "INDIA",
        league: null,
        franchise: null,
        avatarImage: "/assets/player-img/Cheteshwar_Pujara_.png",
        skill: "BATTER",
        todaysVolume: 10000,
        prevPrice: 10,
        currPrice: 9.09,
      },
      {
        name: "R. Sharma",
        currentSupply: 1800,
        country: "INDIA",
        league: "IPL",
        franchise: "MI",
        avatarImage: "/assets/player-img/Rohit_Sharma.png",
        skill: "BATTER",
        todaysVolume: 20000,
        prevPrice: 6.69,
        currPrice: 11.1,
      },
      {
        name: "W. Sundar",
        currentSupply: 500,
        country: "INDIA",
        league: "IPL",
        franchise: "SRH",
        avatarImage: "/assets/player-img/Washington_Sundar_.png",
        skill: "ALLROUNDER",
        todaysVolume: 6950,
        prevPrice: 6.69,
        currPrice: 7.89,
      },
      {
        name: "M. Shami",
        currentSupply: 900,
        country: "INDIA",
        league: "IPL",
        franchise: "SRH",
        avatarImage: "/assets/player-img/Mohammed_Shami.png",
        skill: "BOWLER",
        todaysVolume: 7800,
        prevPrice: 12,
        currPrice: 9.04,
      },
      {
        name: "S. Hetmyer",
        currentSupply: 1500,
        country: "WEST INDIES",
        league: "IPL",
        franchise: "RR",
        avatarImage: "/assets/player-img/Shimron Hetmyer.png",
        skill: "BATTER",
        todaysVolume: 12200,
        prevPrice: 6.69,
        currPrice: 10.29,
      },
      {
        name: "K. Rabada",
        currentSupply: 2500,
        country: "SOUTH AFRICA",
        league: "IPL",
        franchise: "PBKS",
        avatarImage: "/assets/player-img/Kagiso_Rabada.png",
        skill: "BOWLER",
        todaysVolume: 25080,
        prevPrice: 6.69,
        currPrice: 12.69,
      },

      {
        name: "K. Williamson",
        currentSupply: 1300,
        country: "NEW ZEALAND",
        league: "IPL",
        franchise: "SRH",
        avatarImage: "/assets/player-img/Kane_Williamson.png",
        skill: "BATTER",
        todaysVolume: 35000,
        prevPrice: 10.5,
        currPrice: 9.99,
      },
      {
        name: "G. Maxwell",
        currentSupply: 100,
        country: "AUSTRALIA",
        league: "IPL",
        franchise: "RCB",
        avatarImage: "/assets/player-img/Glenn_Maxwell.png",
        skill: "ALLROUNDER",
        todaysVolume: 19000,
        prevPrice: 6.69,
        currPrice: 6.8,
      },
      {
        name: "R. Khan",
        currentSupply: 1900,
        country: "AFGHANISTAN",
        league: "IPL",
        franchise: "GT",
        avatarImage: "/assets/player-img/Rashid_Khan_.png",
        skill: "BOWLER",
        todaysVolume: 60000,
        prevPrice: 6.69,
        currPrice: 11.21,
      },
      {
        name: "M. Rahman",
        currentSupply: 1100,
        country: "BANGLADESH",
        league: "IPL",
        franchise: "DC",
        avatarImage: "/assets/player-img/Mustafizur_Rahman.png",
        skill: "BOWLER",
        todaysVolume: 9000,
        prevPrice: 6.69,
        currPrice: 9.18,
      },
    ];
  const res = fetch(baseUrl + url)
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((e) => {
      return e;
    });
  return res;
};
