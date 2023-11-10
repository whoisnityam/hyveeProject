"use client";

import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Params {
  params: { name: string };
}

function Animal({ params }: Params) {
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined); //error ca be used for error handling in case API fails.
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();

  const handleMore = (event: FormEvent) => {
    event.preventDefault();
    location.reload();
    push(`/${params.name}`);
  };

  const handleBack = (event: FormEvent) => {
    event.preventDefault();
    push(`/`);
  };

  const getRandomPet = async (petType: string): Promise<string> => {
    try {
      if (petType === "cat") {
        const response = await axios.get("https://catfact.ninja/fact");
        return response.data.fact;
      } else if (petType === "dog") {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        return response.data.message;
      } else {
        throw new Error(
          'Invalid pet type. Supported values are "cat" or "dog".'
        );
      }
    } catch (err: any) {
      console.error("Error fetching pet fact:", err.message);
      throw err;
    }
  };

  useEffect(() => {
    getRandomPet(params.name)
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });

    // In React 18 dev mode, where useEffect will run twice if you re using Strictmode. Hence API calls may be made twice. This should be the case in prod
  }, [params.name]);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height="95vh">
      <Stack className={"white-box"}>
        {params.name === "cat" ? (
          <Stack gap={4} alignItems={"center"}>
            <h3 className="heading">
              Let me tell you an awesome fact about cats!
            </h3>
            {!isLoading && (
              <h4 className="heading sub-text">{'"' + response + '"'}</h4>
            )}
          </Stack>
        ) : (
          <Stack gap={4} alignItems={"center"}>
            <h3 className="heading">I woof spending time with you!</h3>
            {!isLoading && (
              <img
                style={{ width: "40vw", maxHeight: "70vh" }}
                src={response}
                alt="ohhh! Something went wrong :("
              ></img>
            )}
          </Stack>
        )}

        <Stack
          direction="row"
          gap={4}
          marginTop={"20px"}
          justifyContent={"space-between"}
        >
          <LoadingButton
            variant="contained"
            className="button"
            onClick={handleMore}
            loading={isLoading}
            disabled={isLoading}
          >
            Show More
          </LoadingButton>
          <Button
            disabled={isLoading}
            variant="contained"
            className="button"
            onClick={handleBack}
          >
            Go Back!
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Animal;
