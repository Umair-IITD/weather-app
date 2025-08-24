"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function Temperature() {
  const { forecast } = useGlobalContext();
  const { main, timezone, name, weather } = forecast || {};

  // ✅ Hooks must always be at the top
  const [localTime, setLocalTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    if (!timezone) return; // ✅ prevent crash if timezone is undefined

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval); // ✅ cleanup interval
  }, [timezone]);

  if (!forecast || !weather) {
    return <Skeleton className="h-[24rem] w-full" />;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}&deg;C</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}&deg;C</span>
          <span>High: {maxTemp}&deg;C</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
