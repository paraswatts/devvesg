import { Entity, ManyToOne, OneToOne, Property, Unique } from "@mikro-orm/core";
import { User } from "../entities/user.entity";
import { BaseEntity } from "../entities/base.entity"
import { NftStatuses } from '../enums';
import { v4 as uuid } from 'uuid';
import { CreditType } from "./credit-type.entity";
import { MediaEntityTypes } from "../interfaces";
import { getSignedUrl } from "../config/s3";
@Entity()
export class Nft extends BaseEntity<Nft>{

    @Property({ columnType: 'text', default: '', nullable: false })
    public assetName: string;

    @Property({ columnType: 'text', nullable: false, default: 'DEVVESG' })
    public creator: string;

    @Property({ columnType: 'text', default: '', nullable: false })
    public assetReferenceUrlRaw: string;

    @Property({ columnType: 'text', default: '', nullable: false })
    public assetReferenceUrlHash: string;

    @Property({ columnType: 'text', default: '1', nullable: false })
    public amount: string;

    @Property({ columnType: 'text', default: 'DEVVESG' })
    public artist: string;

    @Property({ columnType: 'text', default: '' })
    public assetDescription: string;

    @Property({ columnType: 'text', default: '' })
    public nftType: string;

    @Property({ columnType: 'boolean', default: false })
    public forSale: boolean;

    @Property({ columnType: 'text', default: '' })
    public salePrice: string;

    @Property({ columnType: 'text', default: '' })
    public saleCurrency: string;

    @Property({ columnType: 'text', default: '' })
    public saleDescription: string;

    @Property({ columnType: 'text', default: '' })
    public saleLocation: string;

    @Property({ columnType: 'text', default: '' })
    public saleLink: string;

    @Property({ columnType: 'text', nullable: false })
    public creditCount: string;

    @Property({ nullable: false })
    public projectFromDate: Date;

    @Property({ nullable: false })
    public projectToDate: Date;

    @Property({ columnType: 'text', default: '' })
    public methodology: string;

    @Property({ columnType: 'text', nullable: false })
    public projectType: string;

    @Property({ columnType: 'text', nullable: false })
    public projectName: string;

    @Property({ columnType: 'text', default: '' })
    public projectDescription: string;

    @Property({ columnType: 'text', default: '' })
    public projectActivity: string;

    @Property({ columnType: 'text', nullable: false })
    public projectCode: string;

    @Property({ columnType: 'text', nullable: false })
    public projectId: string;

    @Property({ columnType: 'text', nullable: false })
    public projectBatchId: string;

    @Property({ columnType: 'text', default: '' })
    public projectTicker: string;

    @Property({ columnType: 'text', default: '' })
    public geography: string;

    @Property({ columnType: 'text', default: '' })
    public locationCoordinates: string;

    @Property({ columnType: 'text', default: '' })
    public projectStandard: string;

    @ManyToOne(() => CreditType, { nullable: false })
    public creditType: CreditType;

    @Property({ columnType: 'text', default: '' })
    public projectVintage: string;

    @Property({ columnType: 'text', default: '' })
    public projectVerifier: string;

    @Property({ columnType: 'text', default: '' })
    public projectValidator: string;

    @Property({ columnType: 'text', default: '' })
    public publicRegistry: string;

    @Property({ columnType: 'text', default: '' })
    public publicRegistryLink: string;

    @Property({ columnType: 'text', nullable: false, default: NftStatuses.UNDER_REVIEW })
    public status: NftStatuses;

    @ManyToOne(() => User, { nullable: false })
    public createdBy: User;

    @Property({ nullable: true })
    public mintId: string;

    @Property()
    public mediaUuid: string = uuid();

    @Property({ columnType: 'text', default: '' })
    public notes: string;

    @Property({ columnType: 'text', default: '' })
    public mintReceiptUri: string;

    @Property({ columnType: 'text', default: '' })
    public saleReceiptUri: string;

    @Property({ nullable: true })
    public retiredOn: Date;

    @Property({ columnType: 'text', default: '' })
    public soldToWallet: string;

    @Property({ columnType: 'text', default: '' })
    public soldPrice: string;

    @Property({ columnType: 'text', default: '' })
    public soldCurrency: string;

    @Property({ columnType: 'text', default: '' })
    public soldPaymentType: string;

    @Property({ columnType: 'text', default: '' })
    public soldItemReference: string;

    @Property({ columnType: 'text', default: '' })
    public soldOrderId: string;

    @Property({ columnType: 'text', default: null, nullable:true })
    public transferReceiptUri: string;

    @Property({ columnType: 'text', default: null, nullable:true })
    public transferClientId: string;

    public signMedia() {
        this.assetReferenceUrlRaw = getSignedUrl(this.assetReferenceUrlRaw, 'nft', 'asset', this.mediaUuid);
      }
}