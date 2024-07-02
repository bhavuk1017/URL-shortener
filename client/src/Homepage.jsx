import React from 'react'
import { Heading, Text } from "@chakra-ui/react";
import { InputForm } from "./components/InputForm";
export default function Homepage() {
  return (
    <>
          <Heading as="h2" size="4xl" m={ '3% 0% 2% 0%' }>
        URL Shortener 
          </Heading>
          <InputForm />
          <Text m={ '3%' }></Text>
    </>
  )
}
