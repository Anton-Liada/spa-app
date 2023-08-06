import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
export declare class CompaniesController {
    private companiesService;
    constructor(companiesService: CompaniesService);
    getAll(): Promise<import("./companies.model").Company[]>;
    getOne(id: string): Promise<import("./companies.model").Company>;
    createCompany(payload: CreateCompanyDto): Promise<import("./companies.model").Company>;
    update(payload: CreateCompanyDto): Promise<import("./companies.model").Company>;
    delete(id: string): Promise<void>;
}
