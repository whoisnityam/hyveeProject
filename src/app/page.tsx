"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [petPreference, setPetPreference] = useState<string>("");

  const handlePetPreferenceChange = (event: SelectChangeEvent<string>) => {
    setPetPreference(event.target.value);
  };

  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push(`/${petPreference}`);
  };
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height="95vh">
      <Stack className="white-box">
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Are you more of a dog or cat person?</h2>
          <FormControl fullWidth sx={{ margin: "20px 0" }}>
            <InputLabel id="pet-preference-label">Cat or Dog?</InputLabel>
            <Select
              labelId="pet-preference-label"
              id="pet-preference"
              value={petPreference}
              label="Pet Preference"
              onChange={handlePetPreferenceChange}
            >
              <MenuItem value="dog">Dog Person</MenuItem>
              <MenuItem value="cat">Cat Person</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            className="button"
            disabled={petPreference === ""}
          >
            Continue
          </Button>
        </form>
      </Stack>
    </Stack>
  );
}
