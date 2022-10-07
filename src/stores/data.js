import { defineStore } from "pinia";
import { toRaw } from "vue";
import { useFetch } from "../../helper";

export const useDataStore = defineStore("data", {
  state: () => ({
    stocks: [],
    country: [],
    franchise: getDummyFranchise(),
    league: getDummyLeague(),
    error: null,
    success: null,
    countryMapping: {},
    franchiseMapping: {
      "6e6d47d3-4a68-4cee-8ccb-2699e60a99a5": "leagueId",
      "84ecf1b7-dbbe-4526-93db-67bc77fa9e75": "leagueId",
    },
    selectedCountry: null,
    selectedFranchise: null,
    selectedStock: null,
    selectedLeague: null,
    selectedMarketwatch: null,
    franchiseIdNameMapping: {
      "6e6d47d3-4a68-4cee-8ccb-2699e60a99a5": "RCB",
      "84ecf1b7-dbbe-4526-93db-67bc77fa9e75": "CSK",
    },
    noOfRows: null,
  }),
  getters: {
    filteredStock: (state) => {
      return state.stocks
        .filter(
          (e) =>
            (!state.selectedCountry || state.selectedCountry == e.country) &&
            (!state.selectedStock ||
              e.name.toUpperCase().search(state.selectedStock) != -1) &&
            (!state.selectedFranchise ||
              [...e.franchise].includes(state.selectedFranchise)) &&
            getIsBelongToSelectedLeague(
              e,
              state.selectedLeague,
              state.franchiseMapping
            )
        )
        .sort((a, b) => {
          switch (state.selectedMarketwatch) {
            case "GAINERS": {
              return b.pctChange - a.pctChange;
            }

            case "LOOSERS": {
              return a.pctChange - b.pctChange;
            }

            default: {
              return a.todaysVolume - b.todaysVolume;
            }
          }
        })
        .slice(0, state.noOfRows);
    },
  },

  actions: {
    async fetchAllStocks() {
      try {
        const res = await useFetch("stock/fetch-all?refresh=truee");
        this.stocks = res.map((e) => {
          const currPrice = (Math.random() * 100).toFixed(2);
          const prevPrice = (Math.random() * 100).toFixed(2);
          const isEngStock =
            e.country === "e60153f2-e7de-4067-90c9-4b582d2b9265"
              ? "84ecf1b7-dbbe-4526-93db-67bc77fa9e75"
              : null;
          const isAfricaStock =
            e.country === "ba37c274-bebc-48c6-94a9-d55452a17f32"
              ? "6e6d47d3-4a68-4cee-8ccb-2699e60a99a5"
              : null;
          return {
            ...e,
            currPrice: currPrice,
            prevPrice: prevPrice,
            pctChange: (((currPrice - prevPrice) * 100) / prevPrice).toFixed(2),
            franchise: [e.country, isEngStock, isAfricaStock],
          };
        });
        this.filteredStocks = toRaw(this.stocks);
        this.noOfRows = this.stocks.length;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message;
        } else {
          this.error = e.message;
        }
      }
    },
    async fetchCountry() {
      try {
        const res = await useFetch("country");
        this.country = res;
        const temp = {};
        res.forEach((e) => {
          temp[e.id] = e.name;
        });
        this.countryMapping = temp;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message;
        } else {
          this.error = e.message;
        }
      }
    },
    async fetchFranchise() {
      try {
        const res = await useFetch("franchise");
        this.franchise = res;
        temp = {};
        this.franchise.map((e) => {
          temp[e.id] = e.league;
        });

        this.franchiseMapping = temp;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message;
        } else {
          this.error = e.message;
        }
      }
    },
    async fetchLeague() {
      try {
        const res = await useFetch("league");
        this.league = res;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message;
        } else {
          this.error = e.message;
        }
      }
    },
    async fetchStockMetadata() {
      try {
        const res = await useFetch("stock/metadata");
        this.metadata = res;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message;
        } else {
          this.error = e.message;
        }
      }
    },
  },
});
function getIsBelongToSelectedLeague(e, selectedLeague, franchiseMapping) {
  if (!selectedLeague) return true;
  let isBelongToSelectedLeague = false;
  e.franchise.map((currFrachise) => {
    franchiseMapping[currFrachise] === selectedLeague
      ? (isBelongToSelectedLeague = true)
      : null;
  });
  return isBelongToSelectedLeague;
}
function getDummyFranchise() {
  return [
    {
      id: "6e6d47d3-4a68-4cee-8ccb-2699e60a99a5",
      createdAt: "2022-09-29T18:37:01.819Z",
      updatedAt: "2022-09-29T18:37:01.819Z",
      name: "RCB",
    },

    {
      id: "84ecf1b7-dbbe-4526-93db-67bc77fa9e75",
      createdAt: "2022-10-04T08:09:11.541Z",
      updatedAt: "2022-10-04T08:09:11.541Z",
      name: "CSK",
    },
  ];
}

function getDummyLeague() {
  return [{ name: "IPL", id: "leagueId" }];
}
