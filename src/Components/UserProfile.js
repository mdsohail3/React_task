import React, { useState } from 'react'
import styles from "./UserProfile.module.css";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
import UserFetch from '../api/UserFetch';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior,] = useState('inside')
  const btnRef = React.useRef(null)

  const { data: userData, loading, error } = UserFetch("https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01");
  const { data: companyData } = UserFetch("https://fakerapi.it/api/v1/companies?_quantity=1")
  const { data: creditCardInfo } = UserFetch("https://fakerapi.it/api/v1/credit_cards?_quantity=1")
  const { data: boughtItems } = UserFetch("https://fakerapi.it/api/v1/products?_quantity=3&_taxes=1&_categories_type=uuid")

  console.log(boughtItems?.data)


  if (loading) return <Spinner
    thickness='8px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
    margin={" 380px 650px "}
  />

  return (
    <>
      {error && <h1>{error}</h1>}

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recently Bought</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {boughtItems?.data.map((ele, index) => {
              return (
                <div key={ele?.id}>
                  <Card maxW='sm' margin={"30px 5px"}>
                    <CardBody>
                      <Image
                        src={ele?.image}
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>Product name:{ele?.name}</Heading>
                        <Text>
                          {ele?.description}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                          Price:  {ele?.price}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </div>


              );
            })}

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {userData && companyData &&
        <Box bg='gray.500' height={"100vh"} padding={"100px 0 0 100px"} alignContent={"center"} >
          <div className={styles.block}>
            <Grid
              h='380px'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap={4}
              className="grid"
            >
              <div >

                <GridItem rowSpan={2} colSpan={1} >
                  <Card maxW='lg' >
                    <CardBody >
                      <Image
                        src={userData.data[0].image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading align="center" size='md'>{userData?.data[0]?.firstname} {userData?.data[0]?.lastname}</Heading>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing='2'>
                        <Button onClick={onOpen} colorScheme='blue' variant='solid' margin={"0 10px 0 80px"} mt={3} ref={btnRef}>Recently bought
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </GridItem>
              </div>

              <GridItem colSpan={3} bg='lightgrey' >
                <div>

                  <Tabs>
                    <TabList>
                      <Tab>Basic user details</Tab>
                      <Tab>Company details</Tab>
                      <Tab>Credit card information</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Text fontSize='lg'>
                          NAME:
                          {userData?.data[0]?.firstname}
                          {userData?.data[0]?.lastname}
                        </Text>
                        <Text fontSize='lg'>
                          EMAIL:{userData?.data[0]?.email}
                        </Text>
                        <Text fontSize='lg'>
                          Phone:{userData?.data[0]?.phone}
                        </Text>
                        <Text fontSize='lg'>
                          BirthDay:{userData?.data[0]?.birthday}
                        </Text>
                        <Text fontSize='lg'>
                          Gender:{userData?.data[0]?.gender}
                        </Text>
                        <Text fontSize='lg'>
                          Address:{userData?.data[0]?.address?.street}
                          <p>{userData?.data[0]?.address?.country}</p>
                        </Text>
                      </TabPanel>
                      <TabPanel>
                        <Text fontSize='lg'>
                          <p>Comapany name:{companyData?.data[0]?.name}</p>
                          <p>Comapany email:{companyData?.data[0]?.email}</p>
                          <p>vat number:{companyData?.data[0]?.vat}</p>
                          <p>Comapany phone:{companyData?.data[0]?.phone}</p>
                          <p>Country:{companyData?.data[0]?.country}</p>
                          <p>Website:
                            <a href={companyData?.data[0]?.website}>{companyData?.data[0]?.website}</a>
                          </p>
                          <p>ADRDRESSES:</p>
                          <p>1.{companyData?.data[0]?.addresses[0]?.street},{companyData?.data[0]?.addresses[0]?.streetName},{companyData?.data[0]?.addresses[0]?.city},{companyData?.data[0]?.addresses[0]?.country}</p>
                          <p>2.{companyData?.data[0]?.addresses[1]?.street},{companyData?.data[0]?.addresses[1]?.streetName},{companyData?.data[0]?.addresses[1]?.city},{companyData?.data[0]?.addresses[1]?.country}</p>
                        </Text>
                      </TabPanel>
                      <TabPanel>
                        <Text fontSize='lg'>
                          <p>Credit-card type:{creditCardInfo?.data[0]?.type}</p>
                          <p>Credit-card Number:{creditCardInfo?.data[0]?.number}</p>
                          <p>Expiry date:{creditCardInfo?.data[0]?.expiration}</p>
                          <p>Owner:{creditCardInfo?.data[0]?.owner}</p>
                        </Text>

                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </GridItem>
              {/* </div> */}

            </Grid>
          </div>

        </Box>

      }

    </>
  )
}

export default UserProfile