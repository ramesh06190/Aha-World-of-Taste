import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 8.307736, lng: 77.220462 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is", // Replace with your actual API key
    libraries: ["places"],
  });

  const latitude = parseFloat(localStorage.getItem("latitude"));
  const longitude = parseFloat(localStorage.getItem("longitude"));

  const concatenatedValue = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  console.log(concatenatedValue);

  useEffect(() => {
    console.log("Google Maps API is loaded:", isLoaded);
    calculateRoute();
  }, [isLoaded]);

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState(concatenatedValue);
  const [destination, setDestination] = useState(
    "41.26444007396637, -96.0901829202387"
  );
  //8.307142710706065, 77.22871839260522
  // 41.26444007396637, -96.0901829202387
  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    try {
      if (window.google && window.google.maps && isLoaded) {
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        console.log("Directions API Results:", results);
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      } else {
        console.error("Google Maps API is not available.");
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setOrigin("");
    setDestination("");
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;

// AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is
