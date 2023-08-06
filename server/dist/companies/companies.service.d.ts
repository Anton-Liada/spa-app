import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create-company.dto';
export declare class CompaniesService {
    private companyRepository;
    constructor(companyRepository: typeof Company);
    getAllCompanies(): Promise<Company[]>;
    getCompanyById(id: number): Promise<Company>;
    getCompanyByName(name: string): Promise<Company>;
    create(payload: CreateCompanyDto): Promise<Company>;
    update(payload: CreateCompanyDto): Promise<Company>;
    delete(id: number): Promise<void>;
}
