import React from 'react';
import {Box, Typography} from '@mui/material';

function AboutPage() {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <Typography variant="h2">
          About NFT Randomizer
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
        sx={{ml: '35%', width: '30%'}}
      >
        <Typography variant="subtitle1">
          With the rise of NFTs and blockchain technology, there are a vast amount of hurdles between a 
          digital artist and getting their art onto a blockchain. NFT Randomizer aims to remove one of 
          those hurdles by giving digital artists an easy way to randomize their photoshop layers / attributes, 
          as well as give them full control on rarity values applied to each.
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
        sx={{ml: '35%', width: '30%', mt: 3}}
      >
        <Typography variant="subtitle1">
          The user starts by registering an account and logging in. After logging in the user will be taken to the projects page where they can add / edit / delete 
          projects. Once a project is selected from the project page the user is taken to the layers page for that project, where they can add / edit / delete layers
          for that project. Once the user is done adding their layers they can go to the attributes page where they can add / edit / delete attributes and rarities 
          for each layer. There is a rarity counter for each layer to let the user know if they've hit the 100% goal for each.
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
        sx={{ml: '35%', width: '30%', mt: 3}}
      >
        <Typography variant="subtitle1">
          The user then can go to the check inputs page where they can double check that everything looks correct and that all rarities are 100%. If rarities are not all at
          100% the user will not be allowed to generate a CSV until they are. Once rarities are 100% they can enter how many NFTs they want to mint and hit "Generate".
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
        sx={{ml: '35%', width: '30%', mt: 3}}
      >
        <Typography variant="subtitle1">
          Once the user hits "Generate" they will be taken to the Results page. Here their randomly generated CSV will be shown on the page, and 
          a download button below will allow them to export the CSV. 
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
        sx={{ml: '35%', width: '30%', mt: 3}}
      >
        <Typography variant="subtitle1">
          Once the CSV is exported, the user can take the next steps in Photoshop to export images
          by CSV and watch their NFTs come to life!
        </Typography>
      </Box>
    </div>
  );
}

export default AboutPage;
