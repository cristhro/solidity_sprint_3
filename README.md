# IEBS

Sprint 3 - Programación de tokens no fungibles (estándares ERC-720 y ERC-1155)
- Grupo: 15
- Cristhian Rodriguez Gomez
- Jesus Rosas Rosales

## Introducción
En este sprint, usaremos dos nuevos contratos, SchoolCertificateNFT  (que implementa ERC-721) para la gestion de tokens unicos, 
y SchoolEventTickets  (que implementa ERC-1155) para la gestión de ticket (entradas) en los eventos academicos.

### SchoolCertificateNFT
- La escuela podra minar los certificado ntf (mintCertificate)
- La escuela podra quemar los certificado ntf (burn)
- La escuela podra invalidar un certificado ntf (isRevoked)

### SchoolEventTickets
- Este contrato permite a la escuela emitir y transferir tickets (A los estudiantes de la escuela).
- Generación de entradas (mint): Solo el propietario del contrato puede generar nuevas entradas, garantizando un control centralizado.
- Establecimiento de URIs (setURI): Permite asociar un identificador de recurso uniforme (URI) a cada entrada, proporcionando un enlace a información adicional como una imagen o descripción del evento.
- Distribución de entradas (distributeTickets): El propietario puede distribuir entradas a múltiples destinatarios de forma eficiente.
- Transferencia de entradas (transferTicket): Los poseedores de entradas pueden transferirlas a otros usuarios de forma segura, permitiendo la compraventa o intercambio de entradas.


## Configuración del entorno
#### .env:
```sh
SIGNER_DIRECTOR_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_STUDENT_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_SCHOOL_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta

SCHOOL_CERTIFICATE_CONTRACT_ADDRESS = 0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3 ('TOBE CONFIGURED AFTER run script school-certificate:deploy')
STUDENT_ADDRESS = 0x9128EC9e3B228771F291b1309a1Ca42098F94dA0
DIRECTOR_ADDRESS = 0x925687E5C08B9653E57672386fe74c5902016042

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/


#### packages.json:
Pre configuración antes ejecutar los test,  el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacer deploy de school-token:deploy 
Resultado: dirección del contrato School token
```sh
  npm run school-token:deploy
  ->  0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
```

2. Verificar el contrato School Token
```sh
  npm run school-token:verify  0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
  -> Successfully verified contract SchoolToken on Etherscan.
  https://sepolia.etherscan.io/address/0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97#code
```

3. Configurar la variable de entorno en .env
```sh
  SCHOOL_TOKEN_CONTRACT_ADDRESS=0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
```
4. Hacer deploy de school-certificate-nft:deploy 
```sh
   npm run school-certificate-nft:deploy
  -> 0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff
```
5. Verificar el contrato School Certificate NFT
```sh
   npm run school-certificate-nft:verify TODO: añadri 0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff
```
- Resultado: 
    - https://sepolia.etherscan.io/address/0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff#code
    
7. Configurar la variable de entorno en .env
```sh
  SCHOOL_CERTIFICATE_CONTRACT_ADDRESS=0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff
```
8. Hacer deploy de school-event-tickets:deploy 
```sh
   npm run school-event-tickets:deploy
  -> 0xdA9004C3c064BA0Eb211aFFc2ea45516cBa2F4cF
```
9. Verificar el contrato School Event Tickets
```sh
   npm run school-event-tickets:verify 0xdA9004C3c064BA0Eb211aFFc2ea45516cBa2F4cF
```
- Resultado: 
    - https://sepolia.etherscan.io/address/0xdA9004C3c064BA0Eb211aFFc2ea45516cBa2F4cF#code
    
10. Configurar la variable de entorno en .env
```sh
  SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS=0xdA9004C3c064BA0Eb211aFFc2ea45516cBa2F4cF
```

 
## Descripción de los nuevos casos de uso y los tests aplicados
  
 ### Solicitar certificado: 
  El estudiante solicita un certificado al contrato SchoolCertificate. [school-certificate:test1]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run school-certificate:test1 
      > hardhat run scripts/schoolCertificate/test1_student_request_certificate.ts --network ethereum_sepolia_testnet_as_student
      > certificate : [
          'Juan',
          'Tecnología Blockchain',
          BigNumber { value: "2023" },
          false,
          false,
          studentName: 'Juan',
          degree: 'Tecnología Blockchain',
          year: BigNumber { value: "2023" },
          allowed: false,
          granted: false
        ]
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4

  
 ### Autorizar certificado: 
 El estudiante autoriza al director para que se realice el cargo de 100 Tokens (SchoolTokens) para obtener su certificado una vez aprobado [school-certificate:test2].
   - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
   
     ```sh
        npm run school-certificate:test2
        > hardhat run scripts/schoolCertificate/test2_student_allow_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true, <-- ESTO CAMBIA 
            granted: false
          ]
      ```
- Resultado: https://sepolia.etherscan.io/tx/0x77be5c9b57e7e91ebe6b744a2bddbec941d8dbdb8860bcc6d5aee909cbecba37


### Ver solicitud: 
  Como estudiante puedo consultar si mi solicitud ha sido aprobada (granted). [school-certificate:test3].
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
     ```sh
        npm run school-certificate:test3
        > hardhat run scripts/schoolCertificate/test3_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true,
            granted: false
          ]
    ```
  ### Firmar certificado: 
  #### El director firmara el certificado, ademas de la transferencia de la cuenta del estudiante a la cuenta del director
  - Al firmar el certificado se generará un certificado ntf (STUCERT) para el estudiante. (Este certificado nft será unico y no podra ser transferido)
  - Requisitos: Tener configurado las variables de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS y STUDENT_ADDRESS en .env
    
  ```sh
      npm run school-certificate:test4
      > hardhat run scripts/schoolCertificate/test4_director_grant_certificate.ts --network ethereum_sepolia_testnet_as_director
      certificate : [
        'Juan',
        'Tecnología Blockchain',
        BigNumber { value: "2023" },
        true,
        false,
        studentName: 'Juan',
        degree: 'Tecnología Blockchain',
        year: BigNumber { value: "2023" },
        allowed: true,
        granted: true <--- ESTO CAMBIA
      ]
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x3d1d9251fae5078b58689586bc387d324382aa1eefdf8e35e35e23e8d94cd57a


## Descripción de los nuevos casos de uso del contrato School Event Tickets
  ### Generar tickets : 
  #### El director genera 25 tickets para una excursion (SCHOOL_EVENT_TICKET_EXCURSION)
  - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION en .env
    
  ```sh
      npm run school-event-tickets:test1
      > hardhat run scripts/schoolEventTickets/test1_school_generate_tickets.ts --network ethereum_sepolia_testnet_as_school
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x6ae3e547d26bb63b64ac497d40f3393129aa8ecd1af1affe3eb78621e01e7565

  ### Distribuir tickets: 
    #### El director distribuira 3 tickets de los 25  generados (SCHOOL_EVENT_TICKET_EXCURSION) a los estudiantes
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS, STUDENT2_ADDRESS, STUDENT3_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test2
        > hardhat run scripts/schoolEventTickets/test2_school_distribute_tickets.ts --network ethereum_sepolia_testnet_as_school
        Saldo de entradas de 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 1
        Saldo de entradas de 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 1
        Saldo de entradas de 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c: 1
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0x2ab1d5c017630155f2ed939b4f0d72d7c93758d3224c573abf5b0b8c7efa108d
  
  ### Como estudiante consultar mis tickets: 
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test3
        > hardhat run scripts/schoolEventTickets/test2_school_distribute_tickets.ts --network ethereum_sepolia_testnet_as_school
        Saldo de entradas de 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 1
        Saldo de entradas de 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 1
        Saldo de entradas de 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c: 1
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0x1164bf43fde0388c10bfa2dceaa74dcc9b7ede444f5f837e21dbfe4de62b1c07
  
  ### Transferir ticket: 
   #### En esta ocasión transferiremos tickets del estudiante 1 al 2 
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS STUDENT2_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test4
        > hardhat run scripts/schoolEventTickets/test4_school_transfer_ticket_student1_to_student2.ts --network ethereum_sepolia_testnet_as_school
        Student1 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 0
        Student2 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 2
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0xc75ef917bffaf749dbe92da6f0b5fac8f993312be58e988b0db8e3117af6a48b



### El estudiante adquiere tickets de eventos escolares: 
   
