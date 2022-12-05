export enum AssetType {
  Image = "Image",
  Video = "Video",
  Audio = "Audio",
}

export enum AssetStatus {
  NotTransferred = "NotTransferred",
  Transferring = "Transferring",
  TransferPaused = "TransferPaused",
  Transferred = "Transferred",
}
export interface Asset {
  id: number;
  uuid: string;
  status: AssetStatus;
  type: AssetType;
  createdTimestamp: string;
  updatedTimestamp: string;
  fileName: string;
  filePath: string;
}

export interface AssetListType {
  type: AssetType;
  filePath: string;
}

export function BuildAssetStatusFromString(
  value: string | undefined
): AssetStatus | undefined {
  if (value == null) {
    return undefined;
  }

  if (Object.keys(AssetStatus).indexOf(value) >= 0) {
    return AssetStatus[value as AssetStatus];
  } else {
    return undefined;
  }
}

export function AssetStatusToString(value: AssetStatus): string {
  return AssetStatus[value];
}

export function BuildAssetTypeFromString(
  value: string | undefined
): AssetType | undefined {
  if (value == null) {
    return undefined;
  }

  if (Object.keys(AssetType).indexOf(value) >= 0) {
    return AssetType[value as AssetType];
  } else {
    return undefined;
  }
}

export function AssetTypeToString(value: AssetType): string {
  return AssetType[value];
}

export function BuildAssetFromDbResult(row: any): Asset | undefined {
  if (row == null) {
    return undefined;
  }

  const id: number | undefined = row.id;
  const uuid: string | undefined = row.uuid;
  const status: AssetStatus | undefined = BuildAssetStatusFromString(
    row.status
  );
  const type: AssetType | undefined = BuildAssetTypeFromString(row.type);
  const createdTimestamp: string | undefined = row.created_timestamp;
  const updatedTimestamp: string | undefined = row.updated_timestamp;
  const fileName: string | undefined = row.file_name;
  const filePath: string | undefined = row.file_path;

  if (
    id == null ||
    uuid == null ||
    status == null ||
    type == null ||
    createdTimestamp == null ||
    updatedTimestamp == null ||
    fileName == null ||
    filePath == null
  ) {
    return undefined;
  }

  return {
    id: id,
    uuid: uuid,
    status: status,
    type: type,
    createdTimestamp: createdTimestamp,
    updatedTimestamp: updatedTimestamp,
    fileName: fileName,
    filePath: filePath,
  };
}
