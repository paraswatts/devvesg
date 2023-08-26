import { Api } from 'src/api';
import { QueryOrder, UserTypes } from 'src/interfaces';
import { testRenderer } from 'src/mocks/renderer';
import { CarbonCreditsCreditsContainer } from 'src/routes/clients/improve/carbon-credits/credits/CarbonCreditsCreditsContainer';

describe('CarbonCreditsCreditsContainer', () => {
  jest.spyOn(Api.nft, 'list').mockResolvedValueOnce({
    data: {
      "nfts": [
        {
          "uuid": "4d9e941a-32fa-40a8-90ce-0d46d2b33721",
          "createdAt": "2022-06-06T10:57:55.000Z",
          "updatedAt": "2022-06-06T10:57:55.000Z",
          "assetName": "asset name",
          "creator": "DEVVESG",
          "assetReferenceUrlRaw": "https://devvesg-images.s3.amazonaws.com/nft/5971f697-8516-4a97-ac6d-470e44016345-asset.pdf",
          "assetReferenceUrlHash": "61a51355b7ceabde5cad33acce3b9ce191f6d393fe904cf97a016198281951e1b61a4b19e72f95a33755c1db67c44a907205386ab7d8ce57154159432ad4dba5",
          "amount": "1",
          "artist": "DEVVESG",
          "assetDescription": "asset description",
          "nftType": "Carbon",
          "forSale": 'false',
          "salePrice": "",
          "saleCurrency": "",
          "saleDescription": "",
          "saleLocation": "",
          "saleLink": "",
          "creditCount": "12000",
          "projectFromDate": "2022-06-06T18:30:00.000Z",
          "projectToDate": "2022-06-27T18:30:00.000Z",
          "methodology": "VM0018 developed and certified under",
          "projectType": "VM0018 developed and certified under",
          "projectName": "Energy Efficiency",
          "projectDescription": "Desc",
          "projectActivity": "Activity",
          "projectCode": "LCO2",
          "projectId": "VCS 1529",
          "projectBatchId": "Batch ID 0001",
          "projectTicker": "LCO2",
          "geography": "Inner mongolia autonomous region",
          "locationCoordinates": "120°17’52’’~121°37’50’‘E and 47°35’21’’~48 10’13’’N",
          "projectStandard": "VER VCS",
          "creditType": "Carbon",
          "projectVintage": "2014",
          "projectVerifier": "Verra",
          "projectValidator": "China  Environmental United Certification",
          "publicRegistry": "Verra",
          "publicRegistryLink": "https://registry.verra.org/app/projectDetail/VCS/929",
          "status": "Pending Approval",
          "createdBy": {
            "uuid": "6a93b769-a2de-44ba-90ac-b756c013e903",
            "email": "paras.watts@gmail.com",
            "firstName": "Paras",
            "lastName": "Watts",
            "type": UserTypes.CLIENT
          },
          "mintId": 'null',
          "notes": 'null',
          "saleReceiptUri": 'null',
          "nftClientName": "Paras Test Client",
          "assetReferenceThumbnails": [],
        }
      ],
      "pagination": {
        "total": 5,
        "page": 1,
        "size": 10,
        "orderBy": {
          "createdAt": QueryOrder.DESC
        },
        "type": "1"
      }
    }
  });


  const renderTest = testRenderer(<CarbonCreditsCreditsContainer type="1" />);
  test('it renders', () => {
    renderTest();
  });
});
