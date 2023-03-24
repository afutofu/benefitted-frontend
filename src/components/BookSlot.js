import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import { LanguageContext } from "../contexts/LanguageContext";
import { AdminContext } from "../contexts/AdminContext";

const BookSlotComp = styled.section`
  width: 100%;
  height: 100%;
  padding: 20vh 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;

  @media only screen and (max-width: 992px) {
    padding: 15vh 0;
  }
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 450px) {
    width: 80%;
  }
`;

const InfoTitle = styled.h3`
  position: relative;
  font-size: 35px;
  margin: 0;
  margin-bottom: 20px;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;

  @media only screen and (max-width: 992px) {
    font-size: 35px;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const LineWrapper = styled.div`
  top: 50%;
  margin-left: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    width: 50px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: black;
`;

const SlotInfoArea = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Slots = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 20px;
    padding: 0;
  }
`;

const Slot = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #707070;
  border-radius: 12px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.booked ? "#d3c092" : "#e7e3d7")};
  cursor: ${(props) => (props.isAdmin ? "pointer" : "default")};

  transition: background-color 0.2s;

  :hover {
    background-color: ${(props) => props.isAdmin && "#d3c092"};
  }

  :active {
    background-color: ${(props) => props.isAdmin && "#e2d6c0"};
  }

  @media only screen and (max-width: 992px) {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 15px;
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin: 5px;
  }

  @media only screen and (max-width: 450px) {
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }
`;

const InfoArea = styled.div`
  width: 35%;
  height: 100%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.5em;
  margin: 0;
  margin-bottom: 20px;

  @media only screen and (max-width: 992px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 7px;
  }
`;

// Initialize loading variable.
// Avoids users from making requests when another is being sent
let bookSlotLoading = false;
const BookSlot = () => {
  // Initialize states
  const [bookedSlots, setBookedSlots] = useState([]);

  // Retreive states from Language and Admin contexts
  const [language] = useContext(LanguageContext);
  const { admin } = useContext(AdminContext);
  const { isAdmin, setIsAdmin } = admin;

  // Get current month index and year (ex - January is 1)
  const date = new Date();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  // Get all booked slot dates and fetch admin if token is available
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": [localStorage.getItem("token")],
      },
    };

    // Get request to auth route to check if token is valid for client to be set as admin
    axios
      .get("/api/auth/admin", config)
      .then(() => {
        setIsAdmin(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });

    // Get all booked slot dates
    axios
      .get(`/api/slotDates/${year}/${monthIndex}`)
      .then((res) => {
        setBookedSlots([...res.data]);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.msg);
        }
        console.log(err);
      });
  }, [year, monthIndex, setIsAdmin]);

  // Converts month index to return corresponding month name
  const getMonthName = (monthIndex) => {
    if (language === "english") {
      switch (monthIndex) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
        default:
          break;
      }
    }

    // Convert month index to corresponding month name in Indonesian
    switch (monthIndex) {
      case 1:
        return "Januari";
      case 2:
        return "Februari";
      case 3:
        return "Maret";
      case 4:
        return "April";
      case 5:
        return "Mei";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "Agustus";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "Desember";
      default:
        break;
    }
  };

  // Returns the number of days in a month (ex- month=1, year=2020)
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Check if date is booked
  const isBooked = (day) => {
    let booked = false;
    bookedSlots.forEach((bookedSlot) => {
      if (bookedSlot.day === day) {
        booked = true;
      }
    });

    return booked;
  };

  // Book a slot date
  const bookSlot = (day) => {
    if (bookSlotLoading === true) return;

    bookSlotLoading = true;

    if (isAdmin) {
      const config = {
        headers: {
          "x-auth-token": [localStorage.getItem("token")],
        },
      };

      axios
        .post("/api/slotDates", { year, month: monthIndex, day }, config)
        .then((res) => {
          setBookedSlots((bookedSlots) => [...bookedSlots, res.data]);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setIsAdmin(false);
          console.log(err.response.data.msg);
        })
        .finally(() => {
          bookSlotLoading = false;
        });
    }
  };

  // Delete a booked slot
  const deleteBookedSlot = (day) => {
    if (bookSlotLoading === true) return;

    bookSlotLoading = true;

    if (isAdmin) {
      const config = {
        headers: {
          "x-auth-token": [localStorage.getItem("token")],
        },
      };
      axios
        .delete(`/api/slotDates/${year}/${monthIndex}/${day}`, config)
        .then(() => {
          setBookedSlots(
            bookedSlots.filter((bookedSlot) => bookedSlot.day !== day)
          );
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setIsAdmin(false);
          console.log(err.response.data.msg);
        })
        .finally(() => {
          bookSlotLoading = false;
        });
    }
  };

  // Get month name and number of days in a month and year
  const monthName = getMonthName(monthIndex);
  const numDays = daysInMonth(monthIndex, year);

  let slots = [];
  for (let day = 1; day <= numDays; day++) {
    slots.push(
      <Slot
        key={day}
        isAdmin={isAdmin}
        // If the day is booked, onClick deletes it. If not, onClick books it
        onClick={() => {
          if (isBooked(day)) {
            deleteBookedSlot(day);
          } else {
            bookSlot(day);
          }
        }}
        booked={isBooked(day)}
      >
        {day}
      </Slot>
    );
  }

  return (
    <BookSlotComp id="bookslot">
      <Container>
        <InfoTitle>
          {monthName}
          <LineWrapper>
            <Line />
          </LineWrapper>
        </InfoTitle>
        <SlotInfoArea>
          <Slots>
            {slots.map((slot) => {
              return slot;
            })}
          </Slots>
          <InfoArea>
            <InfoText>
              {language === "english"
                ? "We're not open all the time, these are our available slots for now."
                : "Kami tidak buka setiap saat, ini adalah slot yang tersedia untuk saat ini."}
            </InfoText>
            <InfoText>
              {language === "english"
                ? "Look at the empty slots and send us a DM on Instagram."
                : "Lihat slot kosong dan kirimkan DM di Instagram."}
            </InfoText>
            <InfoText>
              {language === "english"
                ? "We'll get back to you as soon as we can."
                : "Kami akan menghubungi Anda kembali secepat kami bisa."}
            </InfoText>
          </InfoArea>
        </SlotInfoArea>
      </Container>
    </BookSlotComp>
  );
};

export default BookSlot;
