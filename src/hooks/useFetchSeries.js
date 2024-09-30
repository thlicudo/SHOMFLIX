import { useState, useEffect } from "react";
import {
  fetchSeries,
  fetchDiscoverSeries,
  fetchTopRatedSeries,
} from "../services/fetchSeries";

// FETCH FOR SLIDER SERIES
export const useFetchSeries = () => {
  const [series, setSeries] = useState({
    airingSeries: [],
    onTheAirSeries: [],
    popularSeries: [],
    topRatedSeries: [],
  });

  useEffect(() => {
    const getSeries = async () => {
      try {
        const data = await fetchSeries();
        setSeries(data);
      } catch (err) {
        console.error(err);
      }
    };
    getSeries();
  }, []);

  return series;
};

// FETCH FOR SLIDESHOW SERIES
export const useFetchTopRatedSeries = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const data = await fetchTopRatedSeries();
        setSeries(data);
      } catch (err) {
        console.error(err);
      }
    };
    getSeries();
  }, []);

  return series;
};

// FETCH FOR SERIES PAGE SERIES
export const useFetchDiscoverSeries = (page) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const results = await fetchDiscoverSeries(page);

        const existingIds = new Set(series.map((series) => series.id));

        const uniqueSeries = results.filter(
          (series) => !existingIds.has(series.id),
        );

        setSeries((prevSeries) =>
          page === 1 ? uniqueSeries : [...prevSeries, ...uniqueSeries],
        );
      } catch (err) {
        console.error(err);
      }
    };
    getSeries();
  }, [page]);

  return series;
};
