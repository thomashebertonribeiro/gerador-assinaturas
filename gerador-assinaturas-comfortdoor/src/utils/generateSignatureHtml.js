export function generateSignatureHtml(data) {
  const { colaborador, links, imagens } = data;

  return `<!-- INICIO ASSINATURA COMFORT DOOR -->
<table width="625" height="164" cellpadding="0" cellspacing="0" border="0" style="width:625px; max-width:625px; height:164px; background-color:#FFFFFF; margin:0; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:Arial, Helvetica, sans-serif;">
  <tr style="height:164px;">
    <td width="118" align="left" valign="middle" style="width:118px; padding-left:14px; padding-right:10px; vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="width:102px; height:136px; border-radius:8px; overflow:hidden;">
            <img src="${imagens.fotoUrl || colaborador.fotoUrl}"
                 alt="${colaborador.nome}"
                 width="102"
                 height="136"
                 style="display:block; width:102px; height:136px; border-radius:8px; border:0; outline:none; text-decoration:none; object-fit:cover;" />
          </td>
        </tr>
      </table>
    </td>
    <td width="318" align="left" valign="middle" style="width:318px; padding:6px 6px 6px 2px; vertical-align:middle;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif;">
        <tr>
          <td style="font-size:20px; font-weight:bold; color:#58585B; line-height:22px; padding-bottom:2px; font-family:Arial, Helvetica, sans-serif;">
            ${colaborador.nome}
          </td>
        </tr>
        <tr>
          <td style="font-size:12px; font-weight:bold; color:#FF8300; line-height:15px; padding-bottom:5px; font-family:Arial, Helvetica, sans-serif; text-transform:uppercase;">
            ${colaborador.cargo}
          </td>
        </tr>
        <tr>
          <td style="font-size:12px; color:#58585B; line-height:16px; font-family:Arial, Helvetica, sans-serif;">
            <span style="color:#58585B; font-weight:normal;">${colaborador.telefone}</span>
            ${colaborador.email ? `<br><a href="mailto:${colaborador.email}" style="color:#58585B; text-decoration:none;">${colaborador.email}</a>` : ''}
            <br>
            <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="color:#58585B; text-decoration:none; font-weight:normal;">
              ${links.siteLabel}
            </a>
          </td>
        </tr>
        <tr>
          <td height="8" style="font-size:1px; line-height:8px;">&nbsp;</td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="135" align="left" valign="middle" style="width:135px; vertical-align:middle;">
                  <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-block;">
                    <img src="${imagens.logoUrl}"
                         alt="Comfort Door"
                         width="123"
                         height="32"
                         style="display:block; width:123px; height:auto; max-height:40px; border:0; outline:none; text-decoration:none;" />
                  </a>
                </td>
                <td align="left" valign="middle" style="vertical-align:middle; padding-left:10px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:0 4px 4px 0;">
                        <a href="${links.instagramUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                          <img src="${imagens.iconeInstagramUrl}" alt="Instagram" width="27" height="27" style="display:block; width:27px; height:27px; border-radius:50%; border:0;" />
                        </a>
                      </td>
                      <td style="padding:0 0 4px 0;">
                        <a href="${links.facebookUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                          <img src="${imagens.iconeFacebookUrl}" alt="Facebook" width="27" height="27" style="display:block; width:27px; height:27px; border-radius:50%; border:0;" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 4px 0 0;">
                        <a href="${links.linkedinUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                          <img src="${imagens.iconeLinkedinUrl}" alt="LinkedIn" width="27" height="27" style="display:block; width:27px; height:27px; border-radius:50%; border:0;" />
                        </a>
                      </td>
                      <td style="padding:0;">
                        <a href="${links.youtubeUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                          <img src="${imagens.iconeYoutubeUrl}" alt="YouTube" width="27" height="27" style="display:block; width:27px; height:27px; border-radius:50%; border:0;" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
    <td width="189" align="right" valign="middle" style="width:189px; padding-right:14px; vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="width:173px; height:136px; border-radius:8px; overflow:hidden;">
            <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
              <img src="${imagens.bannerUrl}"
                   alt="Comfort Door Banner"
                   width="173"
                   height="136"
                   style="display:block; width:173px; height:136px; border-radius:8px; border:0; outline:none; text-decoration:none; object-fit:cover;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- FIM ASSINATURA COMFORT DOOR -->`;
}
