export class CreateArtefactDto {
  title: string;

  height?: number;

  width?: number;

  depth?: number;

  year?: number;

  tags: string[]; //tagId array

  fileUrl: string;

  owner: string; // userId for entity links or plain text for unregistered users

  createdBy: string; //userId

  creationLongitude?: number;

  creationLatitude?: number;

  currentLongitude?: number;

  currentLatitude?: number;
}
