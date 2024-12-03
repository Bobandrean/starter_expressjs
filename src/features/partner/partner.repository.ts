import Partner, {PartnerAttributes} from '../../db/models/Partner';

export const getPartner = async (where: PartnerAttributes) => {
  const query = await Partner.findOne({where});
  return query.toJSON();
};
